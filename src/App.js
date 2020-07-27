import React from "react";
import axios from "axios";
import Memo from "./components/Memo";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      memoData: null,
      isDialogOpen: false,

      input_title: "",
      input_desc: "",
    };
  }

  componentDidMount = async () => {
    const data1 = "세종대왕님";
    const data2 = "하이!";

    const inputData = {
      data1: data1,
      data2: data2,
    };

    await axios
      .post(
        "/api/test",
        {
          params: { inputData },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) =>
        this.setState({
          memoData: response.data,
        })
      );
  };

  render() {
    const { memoData, isDialogOpen, input_title, input_desc } = this.state;

    return (
      <div>
        <AddBoxIcon onClick={this._isDialogOpenToggle} />
        {memoData === null
          ? "Loading..."
          : memoData.map((memo) => {
              return <Memo key={memo.refKey} {...memo} />;
            })}

        {/* Dialog area =========================================================== */}
        <Dialog
          onClose={this._isDialogOpenToggle}
          aria-labelledby="customized-dialog-title"
          open={isDialogOpen}
          fullWidth={true}
          maxWidth={"md"}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this._isDialogOpenToggle}
          >
            REGISTER MEMO
          </DialogTitle>
          <DialogContent>
            <div>
              <div>제목</div>
              <input
                type="text"
                name="input_title"
                onChange={this._valueChangeHandler}
              />
            </div>

            <div>
              <div>내용</div>
              <input
                type="text"
                name="input_desc"
                onChange={this._valueChangeHandler}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this._memoUploadHandler} color="primary">
              SAVE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  _isDialogOpenToggle = () => {
    this.setState({
      isDialogOpen: !this.state.isDialogOpen,
    });
  };

  _memoUploadHandler = async () => {
    const { input_title, input_desc } = this.state;

    // 전처리
    const inputData = {
      input_title,
      input_desc,
      /*key와 value값이 동일하면 :뒤의 value값을 써주지 않아도 자기 자신을 value값으로 함*/
    };

    // 로직
    await axios
      .post("/api/memoUploadHandler", { params: { inputData } })
      .then((response) => {
        if (response.data === 1) {
          this._isDialogOpenToggle();
          this.componentDidMount();
        } else {
          alert("실패");
        }
      });
  };
  //후처리

  _valueChangeHandler = (event) => {
    let nextState = {};

    nextState[event.target.name] = event.target.value;

    this.setState(nextState);
  };
}

export default App;
