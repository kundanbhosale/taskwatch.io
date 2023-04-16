import React, { useEffect, useRef } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
// import Image from '@editorjs/simple-image'
import CheckList from '@editorjs/checklist'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import styled from 'styled-components'
import Marker from '@editorjs/marker'
import Underline from '@editorjs/underline'
import CodeTool from '@editorjs/code'
import DragDrop from 'editorjs-drag-drop'
import Undo from 'editorjs-undo'
import InlineCode from '@editorjs/inline-code'
// import ImageTool from '@editorjs/image'
import Paragraph from '@editorjs/paragraph'
import { idGenerate } from '@utils/idGenerate'

const BlockEditor = ({
  initialData,
  style,
  className,
  onSave,
}: {
  onSave: (data: OutputData) => void
  initialData?: OutputData
  style?: React.CSSProperties
  className?: string
}) => {
  const editorContainerID = idGenerate('editor')
  const editorCore = useRef<EditorJS | null>(null)

  const handleSave = async () => {
    if (!editorCore.current) return
    const data = await editorCore.current.save()
    if (!data || data.blocks.length === 0) return false
    onSave && onSave(data)
  }

  let timer: any

  const handleChange = () => {
    if (!editorCore.current) return
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      handleSave()
    }, 500)
  }

  const handleReady = React.useCallback((editor: EditorJS | null) => {
    if (!editor) return
    const undo = new Undo({ editor })
    initialData && undo.initialize(initialData)
    new DragDrop(editor)
  }, [])
  let editor: EditorJS | null
  const initEditor = () => {
    if (editor) return
    editor = new EditorJS({
      holder: editorContainerID,
      logLevel: 'ERROR' as any,
      data: initialData || undefined,
      placeholder: 'Write something here...',
      onReady: () => {
        editorCore.current = editor
        handleReady(editor)
      },
      onChange: handleChange,
      inlineToolbar: true,
      autofocus: false,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          config: { defaultLevel: 2 },
        },
        list: { class: List, inlineToolbar: true },
        checkList: { class: CheckList, inlineToolbar: true },
        embed: {
          class: Embed,
          inlineToolbar: true,
        },
        underline: Underline,
        // image: {
        //   class: ImageTool,
        //   config: {
        //     byFile: 'http://localhost:4000/uploadFile', // Your backend file uploader endpoint
        //     byUrl: 'http://localhost:4000/fetchUrl', // Your endpoint that provides uploading by Url
        //   },
        // },
        code: CodeTool,
        Marker: {
          class: Marker,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        table: { class: Table, inlineToolbar: true },
        inlineCode: {
          class: InlineCode,
        },
      },
    })
  }

  useEffect(() => {
    if (!editorCore.current) {
      initEditor()
    }
    return () => {
      if (editorCore.current) {
        editorCore.current.destroy()
        editorCore.current = null
      }
    }
  }, [])

  return <Wrapper id={editorContainerID} className={className} style={style} />
}

export default BlockEditor

const Wrapper = styled.div`
  input {
    height: fit-content;
  }
  .ce-block__content,
  .ce-toolbar__content {
    max-width: calc(100% - 110px) !important;
    user-select: none; /* standard syntax */
    -webkit-user-select: none; /* webkit (safari, chrome) browsers */
    -moz-user-select: none; /* mozilla browsers */
    -khtml-user-select: none; /* webkit (konqueror) browsers */
    -ms-user-select: none; /* IE10+ */
  }
  .cdx-block {
    max-width: 100% !important;
  }
  .codex-editor__redactor {
    padding-top: 10px;
  }
  @media (max-width: 650px) {
    .ce-block__content,
    .ce-toolbar__content {
      max-width: calc(100% - 20px) !important;
    }
  }
`
