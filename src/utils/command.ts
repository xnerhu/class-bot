import { IModule } from '../interfaces';

export const getCommandDescription = (
  name: string,
  { description, args }: IModule,
) => {
  const { COMMAND_PREFIX } = process.env;
  let argsStr = '';
  if (args != null) {
    for (const arg of args) {
      argsStr += `\n     • ${arg}`;
    }
  }

  let str = `Polecenie: ${COMMAND_PREFIX}${name}`;
  if (description) str += `\n📃 Opis: ${description}`;
  if (args) str += `\n✏️ Argumenty: ${argsStr}`;
  return str + '\n\n';
};

export const describeMissingArgs = (moduleArgs: string[], missing: number) => {
  let str = ' ';
  for (let i = missing; i < moduleArgs.length; i++) {
    str += `\n     • ${moduleArgs[i]}`;
  }
  return `❌ Brakujące argumenty:${str}`;
};
