import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from 'draft-js-mention-plugin';
import editorStyles from './editorStyles.css';
import mentions from './mentions';

export default class SimpleMentionEditor extends Component {
  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin();
  }

  state = {
    open: false,
    editorState: EditorState.createEmpty(),
    suggestions: mentions,
  };

  onChange = editorState => {
    this.setState({
      editorState,
    });
  };

  onOpenChange = newOpen => {
    this.setState({
      open: newOpen,
    });
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  };

  onAddMention = () => {
    // get the mention object selected
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin];

    return (
      <div className={editorStyles.editor} onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={element => {
            this.editor = element;
          }}
        />
        <MentionSuggestions
          open={this.state.open}
          onOpenChange={this.onOpenChange}
          suggestions={this.state.suggestions}
          onSearchChange={this.onSearchChange}
          onAddMention={this.onAddMention}
        />
      </div>
    );
  }
}
