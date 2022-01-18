import * as path from "path";

export const filePathToTitle = (filePath: string): string => {
  const fileName = path.basename(filePath, '.opus')
  const matcher = fileName.match(/(.{11})_(.*)/)
  if (matcher) {
    const [, , title] = matcher
    return title
  }
  return ''
}
