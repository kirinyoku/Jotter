import { FC, ReactNode } from 'react';

interface EditorProps {
  children: ReactNode;
}

const EditorLayout: FC<EditorProps> = ({ children }) => {
  return <div className="container mx-auto grid items-start gap-10 py-8">{children}</div>;
};

export default EditorLayout;
