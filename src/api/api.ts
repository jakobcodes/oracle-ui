import { FetchActionRequestBody } from "@/types/FetchActionRequestBody";
import { OracleResponse } from "@/types/OracleResponse";
import { UploadPolicyResponse } from "@/types/UploadPolicyResponse";
import { UploadPolicyRequestBody } from "@/types/UploadPolicyRequestBody";
import { Policy } from "@/types/Policy";

export const fetchAction = async (
  body: FetchActionRequestBody
): Promise<OracleResponse> => {
  const response = await fetch("http://localhost:8080/oracle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

export const fetchActionsHistory = async (): Promise<OracleResponse[]> => {
  const response = await fetch("http://localhost:8080/actions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

export const uploadPolicy = async (
  body: UploadPolicyRequestBody
): Promise<UploadPolicyResponse> => {
  const response = await fetch("http://localhost:8080/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

export const fetchPoliciesHistory = async (): Promise<Policy[]> => {
  const response = await fetch("http://localhost:8080/policies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};
