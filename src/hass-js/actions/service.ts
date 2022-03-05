import { MessageBase } from "home-assistant-js-websocket";
import { connection } from "../lib/haConnection";

interface ICallService {
  [key: string]: any;
}

const service = async (data: ICallService) => await connection?.sendMessagePromise({ ...data, type: "call_service" });

export default service;
