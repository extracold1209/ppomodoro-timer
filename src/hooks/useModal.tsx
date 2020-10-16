import React, {useState} from 'react';
import ReactModal from 'react-modal';

type VisibleFunction = (visible: boolean) => void;
type Component = React.FC;

type IProps = {
    defaultOpened?: boolean;
    component: Component;

}

export default (props: IProps): [VisibleFunction, Component] => {
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
            <Component />
        </ReactModal>
    ];
};
