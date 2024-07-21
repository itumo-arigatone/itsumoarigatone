export function convertToFiles(values: FormDataEntryValue[]): File[] {
  return values.filter((value): value is File => value instanceof File);
}