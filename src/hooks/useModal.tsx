import React, {useState} from 'react';
import ReactModal from 'react-modal';

export type BaseModalContainerProps = {
    onConfirm: () => void;
}

type VisibleFunction = (visible: boolean) => void;
type TargetComponent = React.FC<BaseModalContainerProps>;

type IProps = {
    defaultOpened?: boolean;
    component: TargetComponent;

}

export default (props: IProps): [VisibleFunction, React.FC] => {
    const { defaultOpened = false, component: Component } = props;
    const [isOpen, setOpenState] = useState(defaultOpened);

    return [
        setOpenState,
        () => <ReactModal
            isOpen={isOpen}
            closeTimeoutMS={500}
            onRequestClose={() => setOpenState(false)}
            style={{
                content: {
                    maxWidth: 500,
                    margin: 'auto',
                    padding: 0,
                    border: 'none',
                    borderRadius: 4,
                    boxShadow: 'rgba(0, 0, 0, 0.5) 10px 10px 10px 0px',
                },
                overlay: {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                },
            }}
        >
            <Component
                onConfirm={() => setOpenState(false)}
            />
        </ReactModal>
    ];
};
