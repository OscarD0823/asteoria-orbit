export type CellDraft={sheet:string;row:number;col:number;text:string};
/** A pending cell is restored for review, rather than applied to the workbook automatically. */
export function recoverCellDraft(value:unknown,sheets:string[]):CellDraft|undefined{
 const draft=value as CellDraft;if(!draft||typeof draft.sheet!=='string'||!sheets.includes(draft.sheet)||!Number.isInteger(draft.row)||draft.row<0||draft.row>=1_048_576||!Number.isInteger(draft.col)||draft.col<0||draft.col>=16_384||typeof draft.text!=='string')return undefined;return draft;
}
