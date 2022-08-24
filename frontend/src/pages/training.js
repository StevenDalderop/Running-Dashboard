import React from "react";
import {
	Switch,
	Route,
} from "react-router-dom";
import TrainingList from "../components/training/trainingList"
import TrainingDetail from "../components/training/trainingDetail";
import styled from "styled-components";

export default function Training() {
    return (
        <Wrapper>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3 d-none d-md-inline">
                        <TrainingList />
                    </div>
                    <div className="col-md-9">
                        <Switch>
                            <Route exact path="/trainings">
                                Please select a training
                            </Route>
                            <Route path="/trainings/:trainingId">
                                <TrainingDetail isInNavbar={false} />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

let Wrapper = styled.div`

`