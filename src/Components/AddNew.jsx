import { useState } from "react";
import { dotnetApi } from "../api/axios";
import { useNavigate } from "react-router-dom";

function AddNew() {
  const [card, setCard] = useState({
    german: "",
    hungary: "",
  });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const practice = () => {
    navigate("/main");
  };

  const handleAdd = async () => {
    try {
      if (card.german.length < 3 || card.hungary.length < 3) {
        setShowErrorModal(true);
        return;
      }
      const response = await dotnetApi.post("card", {
        hungary: card.hungary,
        german: card.german,
      });
      console.log(response);
      console.log("itt")
      setShowSuccessModal(true);
    } catch (error) {
      console.error("hiba", error);
      setShowErrorModal(true);
      setErrorMessage(error?.response?.data)
    }
  };

  const closeModals = () => {
    setShowErrorModal(false);
    setShowSuccessModal(false);
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card" style={{ width: "40rem", background: "#F2F2F2" }}>
        <div className="card-body" style={{ width: "100%" }}>
          <h1 className="card-title rounded text-center mt-5 mb-5">Neu Ausdruck</h1>

          <hr style={{border:"3px solid"}}></hr>

          {/* <div
            className="card-text text-center mt-4"
            style={{ fontSize: 32, fontWeight: "600" }}
          >
            Deutsch
          </div>
          <hr style={{border:"0.5px solid", width:"50%", margin:"auto"}}></hr> */}
          <div className="form-row mt-5 mb-5">
            <div className="col-md-10"
            style={{width:"100%"}}>
              <input
                type="text"
                id="inputGerman"
                onChange={(e) => setCard({ ...card, german: e.target.value })}
                placeholder="Deutsch"
                value={card.german}
                className="form-control form-control-lg text-center"
                style={{fontSize:"28px", width:'100%'}}
              ></input>
            </div>
          </div>

          <hr style={{border:"1px solid"}}></hr>

          {/* <div
            className="card-text text-center mt-5 mb-3"
            style={{ fontSize: 32, fontWeight: "600" }}
          >
            Magyar
          </div> */}
          <div className="form-row mb-5 mt-5">
            <div className="col-md-10"
            style={{width:"100%"}}>
              <input
                type="text"
                id="inputHungary"
                onChange={(e) => setCard({ ...card, hungary: e.target.value })}
                placeholder="Magyar"
                value={card.hungary}
                className="form-control form-control-lg text-center"
                style={{fontSize:"28px"}}
              ></input>
            </div>
          </div>

          <hr style={{border:"2px solid"}}></hr>

          <div className="row">
            <div className="col-6 text-center mt-3 mb-3">
              <button 
              className="btn btn-success btn-lg" 
              onClick={handleAdd}
              style={{width:"250px", fontSize:"28px"}}>
                Hinzufügen
                <div className="text-muted" style={{ fontSize: "16px" }}>
                  Hozzáadás
                </div>
              </button>
            </div>
            <div className="col-6 text-center mt-3 mb-3">
              <button 
              className="btn btn-primary btn-lg" 
              onClick={practice}
              style={{width:"250px", fontSize:"28px"}}>
                Übung
                <div className="text-muted" style={{ fontSize: "16px" }}>
                  Gyakorlás
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      {showErrorModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Error</h5>
                <button type="button" className="close" onClick={closeModals}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Hiba történt a kártya hozzáadása közben. Kérlek, próbáld újra. {"\n"}
                {errorMessage}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModals}>
                  Bezárás
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Siker</h5>
                <button type="button" className="close" onClick={closeModals}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">A kártya sikeresen hozzáadva!</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModals}>
                  Bezárás
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddNew;
