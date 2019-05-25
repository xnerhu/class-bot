import { WolframClient } from 'node-wolfram-alpha';
import { ChatButtons } from 'fb-chat-api-buttons';

class Store {
  public wolfram: WolframClient;

  public buttons: ChatButtons;
}

export default new Store();
