export const parseRawText = (text: string) => {
  const { COMMAND_PREFIX } = process.env;
  if (!text.startsWith(COMMAND_PREFIX)) {
    return null;
  }

  let name: string;
  let args: string[] = [];

  let str = '';
  let quotes = false;

  for (let i = COMMAND_PREFIX.length; i < text.length; i++) {
    if (text[i] === '"') {
      quotes = !quotes;
    } else if (text[i] !== ' ' || quotes) {
      str += text[i];
    }

    if ((text[i] === ' ' && !quotes) || i === text.length - 1) {
      if (name == null) name = str;
      else args.push(str);
      str = '';
    }
  }

  return { name: name.toLowerCase(), args };
};
