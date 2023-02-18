import BlockContent from '@sanity/block-content-to-react';
import HighlightCode from './HighlightCode';
import { urlFor } from 'lib/api';

const serializers = {
  types: {
    code: ({node: {language, code, filename}}) => {
      return (
        <HighlightCode language={language}>
          {code}
          <div className="code-filename">{filename}</div>
        </HighlightCode>
      )
    },
    image: ({node: {asset, alt, position = 'center'}}) => {
      return (
        <div className={`blog-image blog-image-${position}`}>
          <img src={urlFor(asset).height(300).fit('max').url()} />
          <div className="image-alt">{alt}</div>
        </div>
      )
    }
  }
}

export default function BlogContent({content}) {
  return (
    <BlockContent 
      serializers={serializers}
      blocks={content} />
  )
}