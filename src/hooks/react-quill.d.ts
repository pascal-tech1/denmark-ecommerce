// react-quill.d.ts
declare module "react-quill" {
  import { Quill } from "quill";
  import * as React from "react";

  export interface ReactQuillProps {
    value?: string | Delta;
    defaultValue?: string | Delta;
    readOnly?: boolean;
    theme?: string;
    modules?: {
      toolbar?: {
        container?: Array<any>;
        handlers?: { [key: string]: () => void };
      };
    };
    formats?: string[];
    bounds?: string | HTMLElement;
    placeholder?: string;
    tabIndex?: number;
    onChange?: (
      content: string,
      delta: Delta,
      source: Sources,
      editor: UnprivilegedEditor
    ) => void;
    onChangeSelection?: (
      range: Range,
      source: Sources,
      editor: UnprivilegedEditor
    ) => void;
    onFocus?: (
      range: Range,
      source: Sources,
      editor: UnprivilegedEditor
    ) => void;
    onBlur?: (
      previousRange: Range,
      source: Sources,
      editor: UnprivilegedEditor
    ) => void;
    children?: React.ReactNode;
  }

  class ReactQuill extends React.Component<ReactQuillProps> {
    getEditor: () => Quill;
  }

  export default ReactQuill;
}
