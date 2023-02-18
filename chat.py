from chatgpt import Conversation

conversation = Conversation(config_path={"config.json"})

for chunk in conversation.stream("Hello"):
    print(chunk, end="")