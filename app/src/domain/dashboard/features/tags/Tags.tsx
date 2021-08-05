import React, {useState} from 'react';
import {StyleProp, View} from 'react-native';
import Tag from '../../../../components/tag/Tag';
import styles from './TagsStyles';

const initTags = [
  {id: 1, text: 'hello', activeColor: '#F00'},
  {id: 2, text: 'hi', activeColor: '#24858b'},
];

const Tags: React.FunctionComponent<{style: StyleProp<any>}> = ({style}) => {
  const [tags, setTags] = useState(initTags);

  return (
    <View style={{...style, ...styles.container}}>
      {tags.map(tag => (
        <Tag
          key={tag.id}
          text={tag.text}
          active
          activeColor={tag.activeColor}
          style={styles.tag}
        />
      ))}
    </View>
  );
};

export default Tags;
