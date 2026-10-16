import {test} from 'node:test';import assert from 'node:assert/strict';
import {indexedDB} from 'fake-indexeddb';
import {saveBook,loadBook} from '../src/sheets-storage';
import {recoverCellDraft} from '../src/sheet-draft';
test('un borrador de celda se recupera separado de los bytes originales y se retira al confirmar',async()=>{Object.assign(globalThis,{indexedDB});const draft={sheet:'Hoja1',row:3,col:2,text:'=SUM(A1:A3)+'},book={bytes:new Uint8Array([80,75,3,4]),name:'Mi cálculo',warnings:[],original:null};await saveBook({...book,draft});const loaded=await loadBook();assert.deepEqual(loaded?.bytes,book.bytes);assert.deepEqual(recoverCellDraft(loaded?.draft,['Hoja1']),draft);await saveBook(book);assert.equal((await loadBook())?.draft,undefined);});
test('una copia anterior sin borrador abre y metadatos inválidos no desplazan a una celda inexistente',()=>{assert.equal(recoverCellDraft(undefined,['Hoja1']),undefined);for(const change of [{row:-1},{col:16_384},{sheet:'Ausente'},{text:null}])assert.equal(recoverCellDraft({sheet:'Hoja1',row:0,col:0,text:'Texto',...change},['Hoja1']),undefined);});
