import React, {useState} from "react";
import {connect} from "react-redux";

import Backdrop from "../../UI/Backdrop/Backdrop";
import Button from "../../UI/Button/Button";
import CandleEditor from "./CandleEditor/CandleEditor";
import CandleEditorForm from "./CandleEditor/CandleEditorForm/CandleEditorForm";
import Modal from "../../UI/Modal/Modal";
import RealmEditorForm from "./RealmEditor/RealmEditorForm/RealmEditorForm";
import RealmEditor from "./RealmEditor/RealmEditor";

import classes from "./CandleManager.module.css";

const CandleManager = (props) => {
    const [modal, setModal] = useState({
        showBackdrop: false,
        showModal: false,
    });

    const [modalContent, setModalContent] = useState();

    function toggleModal(content) {
        setModal(prevValue => {
            return {
                showBackdrop: !prevValue.showBackdrop,
                showModal: !prevValue.showModal
            }
        });

        if (content === "realm") {
            setModalContent(<RealmEditorForm onClick={toggleModal}/>);
        } else if (content === "candle") {
            setModalContent(<CandleEditorForm onClick={toggleModal} />);
        } else {
            
        }
    }

    return (
        <div className={classes.CandleManager}>
            <Backdrop show={modal.showBackdrop} onClick={toggleModal}/>
            <Modal show={modal.showModal}>
                {modalContent}
            </Modal>
            <h1>assistant regional candle manager</h1>
            <RealmEditor 
                onAdd={() => toggleModal("realm")} 
                onEdit={() => toggleModal("realm")} />
            <CandleEditor />
            <Button clicked={() => toggleModal("candle")} btnType="Success" disabled={props.realms.length === 0}>Add Candle</Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        realms: state.realms.realms
    };
};

export default connect(mapStateToProps)(CandleManager);