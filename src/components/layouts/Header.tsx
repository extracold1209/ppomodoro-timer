import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

const HeaderContainer = styled.header`
    display:flex;
    justify-content: center;
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: rgb(245, 195, 64);
    top: 0;
    left: 0;
    height: 4vh;
`;

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

const Header: React.FC = () => {
    let subtitle: any = {};
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal(){
        setIsOpen(false);
    }


    return (
        <HeaderContainer>
            Hello?
            <button onClick={openModal}>Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
        </HeaderContainer>
    );
};

export default Header;
