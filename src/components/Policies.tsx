import React, { useState, useEffect } from 'react';
import { Policy } from "@/types/Policy";
import { fetchPoliciesHistory } from "@/api/api";

export function Policies() {
    const [policies, setPolicies] = useState<Policy[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const fetchPolicies = async () => {
      try {
        fetchPoliciesHistory()
          .then(response => {
            setPolicies(response);
            setLoading(false);
          })
      } catch (err) {
        setError('Failed to fetch policy changes.');
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchPolicies();
    }, []);

    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Policy Changes</h2>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            <ul className="divide-y divide-gray-300 mb-4">
              {policies.length > 0 ? (
                policies.sort((a, b) =>
                  a.datetime < b.datetime ? 1 : b.datetime < a.datetime ? -1 : 0
                ).map((policy) => (
                  <li key={policy.policy_name} className="py-4">
                    <div className="font-medium text-lg text-gray-800">{policy.policy_name}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(policy.datetime).toLocaleString()}
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No policy changes found.</p>
              )}
            </ul>
            <button
              onClick={fetchPolicies}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Reload
            </button>
          </>
        )}
      </div>
    );
}
