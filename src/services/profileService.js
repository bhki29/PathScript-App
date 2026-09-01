import * as ImagePicker from "expo-image-picker";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const MAX_DIMENSION = 400;
const JPEG_QUALITY = 0.5;
const MAX_BASE64_LENGTH = 700_000;

export class ImageTooLargeError extends Error {
  constructor() {
    super("IMAGE_TOO_LARGE");
    this.name = "ImageTooLargeError";
  }
}

export class PermissionDeniedError extends Error {
  constructor() {
    super("PERMISSION_DENIED");
    this.name = "PermissionDeniedError";
  }
}

export async function pickProfilePhoto() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    throw new PermissionDeniedError();
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (result.canceled || !result.assets?.length) {
    return null;
  }

  return result.assets[0].uri;
}

export async function compressImageToBase64(uri) {
  const context = ImageManipulator.manipulate(uri);
  const manipulated = await context
    .resize({ width: MAX_DIMENSION })
    .renderAsync();
  const saved = await manipulated.saveAsync({
    format: SaveFormat.JPEG,
    compress: JPEG_QUALITY,
    base64: true,
  });

  context.release?.();
  manipulated.release?.();

  return `data:image/jpeg;base64,${saved.base64}`;
}

export async function updateProfilePhoto(uid) {
  const pickedUri = await pickProfilePhoto();
  if (!pickedUri) return null;

  const dataUri = await compressImageToBase64(pickedUri);

  if (dataUri.length > MAX_BASE64_LENGTH) {
    throw new ImageTooLargeError();
  }

  await setDoc(
    doc(db, "users", uid),
    { photoBase64: dataUri },
    { merge: true },
  );

  return dataUri;
}
