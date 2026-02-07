export interface Message {
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export default function Message(props: Message) {
  return (
    <>
      <div className={`message-wrapper flex w-full ${props.sender === 'user' ? 'justify-start!' : 'justify-end!'}`}>
        <div className="bg-zinc-950 justify-end w-sm text-zinc-100 p-2 flex rounded-xl items-center">
          <span>{props.content}</span>
        </div>
      </div>
    </>
  );
}
