import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./Group.css";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const fetchGroups = async () => {
    try {
      const res = await api.get("/groups");
      setGroups(res.data);
    } catch (error) {
      console.error("Failed to fetch groups:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleClick = (id) => {
    navigate(`/group/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bu groupni o‘chirishni istaysizmi?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/groups/${id}`);
      fetchGroups();
    } catch (error) {
      console.error("Groupni o‘chirishda xatolik:", error);
    }
  };

  return (
    <div className="group-container">
      <h2>Groups</h2>
      <table className="group-table">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group._id}>
              <td onClick={() => handleClick(group._id)}>{group.name}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(group._id)}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Groups;

