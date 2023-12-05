import React from 'react';
import Modal from 'react-modal';
import Wrapper from '../assets/wrappers/BasicInfo';
// 病患 key 值翻譯
const keyToChinese = {
    _id: "編號",
    medical_history_no: "歷史編號",
    chief_complaint: "主訴",
    symptoms: "症狀",
    treatment_process: "治療過程",
  };
  
// 不要顯示的 key 值
const dontShowKey = {
_id: "編號",
};
export  {dontShowKey,keyToChinese};

// 病人簡介樣板
const BasicInfoModal = ({ isOpen, closeModal, data }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <button onClick={closeModal}>X</button>
      <div className="content-center">
        {data ? (
          <Wrapper style={{ width: '100%', height: '100%' }}>
            <div style={{
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              padding: '10px',
              borderRadius: '15px',
              border: '2px solid black',
              margin: '20px 0'
            }}>
              病人簡介
            </div>
            {data.medCase ? Object.keys(data.medCase)
              .filter(key => !dontShowKey[key])
              .map(key => (
                <div
                  key={key}
                  style={{
                    width: '80%',
                    height: '20%',
                    padding: '10px',
                    marginBottom: '30px',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* 翻譯 key 值到中文 */}
                  {`${keyToChinese[key] || key}: ${data.medCase[key]}`}
                </div>
              )) : <p>查無此資料</p>
            }
          </Wrapper>
        ) : <p>正在加載數據...</p>}
      </div>
    </Modal>
  );
};

export default BasicInfoModal;