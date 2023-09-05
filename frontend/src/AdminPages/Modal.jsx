import PropTypes from "prop-types";
import ReactDom from 'react-dom';
import { FaTimes } from 'react-icons/fa';

const MODAL_STYLES = {
  position: 'absolute',
  top: '58%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  height: '520px',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000,
  marginTop: '0',
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
}

function Modal(props) {
  if (!props.open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button onClick={props.onClose} style={{
          border:'None',
          backgroundColor:'red',
          color:'white'
        }}><FaTimes className="cross-icon" /> </button>
          {props.children}
      </div>
    </>,
    document.getElementById('portal')
  )
}


export default Modal;
