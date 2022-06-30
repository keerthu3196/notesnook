import { ToolbarDefinition, ToolDefinition } from "./types";
import { ToolId } from "./tools";
export declare function getToolDefinition(id: ToolId): ToolDefinition;
export declare function getAllTools(): Record<"bold" | "italic" | "underline" | "strikethrough" | "code" | "codeRemove" | "alignCenter" | "alignLeft" | "alignRight" | "alignJustify" | "subscript" | "superscript" | "ltr" | "rtl" | "numberedList" | "bulletList" | "highlight" | "textColor" | "openLink" | "linkSettings" | "imageSettings" | "rowProperties" | "insertRowBelow" | "insertRowAbove" | "moveRowDown" | "moveRowUp" | "deleteRow" | "columnProperties" | "insertColumnRight" | "insertColumnLeft" | "moveColumnRight" | "moveColumnLeft" | "deleteColumn" | "cellProperties" | "cellBorderColor" | "deleteTable" | "mergeCells" | "splitCells" | "attachmentSettings" | "embedSettings" | "tableSettings" | "math" | "fontSize" | "fontFamily" | "removeAttachment" | "downloadAttachment" | "clearformatting" | "addLink" | "editLink" | "removeLink" | "insertBlock" | "headings" | "imageAlignCenter" | "imageAlignLeft" | "imageAlignRight" | "imageProperties" | "embedAlignCenter" | "embedAlignLeft" | "embedAlignRight" | "embedProperties" | "cellBackgroundColor" | "cellTextColor" | "cellBorderWidth", ToolDefinition>;
export declare const DEFAULT_TOOLS: ToolbarDefinition;
