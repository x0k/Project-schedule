export const operators = {
  extract (template, dictionary) {
    const regexp = /%(.+?)\b/g
    let str = template
    let result = regexp.exec(str)
    while (result) {
      const [match, name] = result
      str = str.replace(match, dictionary[name])
      result = regexp.exec(str)
    }
    return str
  }
}
