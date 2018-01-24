import { Modifier, EditorState } from 'draft-js';
import getSearchText from '../utils/getSearchText';
import getTypeByTrigger from '../utils/getTypeByTrigger';

const addMention = (editorState, mention, mentionPrefix, mentionTrigger, entityMutability) => {
  const contentStateWithEntity = editorState.getCurrentContent().createEntity(
    getTypeByTrigger(mentionTrigger), entityMutability, { mention }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const currentSelectionState = editorState.getSelection();
  const { begin, end } = getSearchText(editorState, currentSelectionState, mentionTrigger);

  const alwaysAddSpace = true;

  // get selection of the @mention search text
  const mentionTextSelection = currentSelectionState.merge({
    anchorOffset: begin,
    focusOffset: end,
  });

  // save inline style
  const currentInlineStyle = editorState.getCurrentInlineStyle();

  let mentionReplacedContent = Modifier.replaceText(
    editorState.getCurrentContent(),
    mentionTextSelection,
    `${mentionPrefix}${mention.get('name')}`,
    null, // no inline style needed
    entityKey
  );

  // If the mention is inserted at the end, a space is appended right after for
  // a smooth writing experience.
  const blockKey = mentionTextSelection.getAnchorKey();
  const blockSize = editorState.getCurrentContent().getBlockForKey(blockKey).getLength();
  if (alwaysAddSpace || blockSize === end) {
    mentionReplacedContent = Modifier.insertText(
      mentionReplacedContent,
      mentionReplacedContent.getSelectionAfter(),
      ' ',
    );
  }

  const newEditorState = EditorState.push(
    editorState,
    mentionReplacedContent,
    'insert-mention',
  );

  const newEditorStateWithSelection = EditorState.forceSelection(newEditorState, mentionReplacedContent.getSelectionAfter());

  return EditorState.setInlineStyleOverride(newEditorStateWithSelection, currentInlineStyle);
};

export default addMention;
