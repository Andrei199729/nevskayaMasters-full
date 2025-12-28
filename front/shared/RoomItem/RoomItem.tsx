import {useCallback, memo} from 'react';
import {Pressable, Text} from 'react-native';
import {IProductRoom} from '../types';

interface ProductItemProps {
  room: IProductRoom;
  index: number;
  onClick: (roomId: string) => void;
}

export const ProductItem = memo(({room, index, onClick}: ProductItemProps) => {
  const handlePress = useCallback(() => {
    if (!room._id) return;
    onClick(room._id);
  }, [room._id, onClick]);

  return (
    <Pressable onPress={handlePress}>
      <Text>
        {index + 1} {room.nameRoom}
      </Text>
    </Pressable>
  );
});
