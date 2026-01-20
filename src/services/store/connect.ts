import type { Block, Props as BlockProps } from '@/shared/Block';

import { Store, StoreEvents } from './Store';
import type { AppState } from './types';

type BlockClass<P, B extends BlockProps> = new (
  props: P
) => Block<B> & { render: () => string };

export function connect<StateProps extends object, P, B extends BlockProps>(
  Component: BlockClass<P & StateProps, B>,
  mapStateToProps: (state: AppState) => StateProps
): BlockClass<P, B> {
  return class ConnectedBlock extends Component {
    constructor(props: P) {
      const store = Store.getInstance();
      // объединяем переданные пропсы с данными из стора
      const stateProps = mapStateToProps(store.getState());
      super({ ...props, ...stateProps } as P & StateProps);

      const handleStoreUpdate = () => {
        const newStateProps = mapStateToProps(store.getState());
        this.setProps(newStateProps);
      };

      store.on(StoreEvents.Updated, handleStoreUpdate);

      const originalUnmount = this.componentWillUnmount?.bind(this);
      this.componentWillUnmount = () => {
        store.off(StoreEvents.Updated, handleStoreUpdate);
        originalUnmount?.();
      };
    }
  };
}
