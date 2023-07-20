import { Col, Grid } from "@tremor/react";
import "./App.css";
import { AddTask } from "./components/AddTask";
import { Tasks } from "./components/Tasks";

const App = () => {
	return (
		<div className="app">
			<Grid numItemsSm={1} numItemsLg={4} numItemsMd={1} className="gap-5">
				<Col>
					<AddTask />
				</Col>
				<Col numColSpanSm={1} numColSpanLg={3} numColSpanMd={1}>
					<Tasks />
				</Col>
			</Grid>
		</div>
	);
};

export default App;
