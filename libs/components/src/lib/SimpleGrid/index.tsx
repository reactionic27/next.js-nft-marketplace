import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';
import * as React from 'react';

export default function Grid(props: SimpleGridProps) {
  // The useMemo hook returns a memoized value.Therefore,
  // it caches a value so that it does not need to be recalculated.
  // In this case, this hook will only run when the props update.
  // Hence, the value of the columns does not need to be recalculated unless the props change which helps improve performance

  const columns = React.useMemo(() => {
    const count = React.Children.toArray(props.children).filter(
      React.isValidElement
    ).length;
    return {
      base: Math.min(2, count),
      md: Math.min(3, count),
      lg: Math.min(4, count),
      xl: Math.min(4, count),
    };
  }, [props.children]);

  return (
    <SimpleGrid
      columns={columns}
      columnGap={{ base: '4', md: '6' }}
      rowGap={{ base: '8', md: '10' }}
    >
      {props.children}
    </SimpleGrid>
  );
}
