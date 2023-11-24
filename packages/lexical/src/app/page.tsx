import { Editor } from "./components/Editor";

export default function Home() {
  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <Editor />
      </div>
    </main>
  );
}
