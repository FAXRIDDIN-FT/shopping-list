import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import "./group.css";

const Group = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [newItemTitle, setNewItemTitle] = useState("");

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await api.get(`/groups/${id}`);
        setGroup(res.data);
      } catch (error) {
        console.error("Failed to fetch group:", error);
      }
    };
    fetchGroup();
  }, [id]);
  const handleAddItem = async () => {
    if (!newItemTitle.trim()) return;

    try {
      await api.post(`/groups/${id}/items`, { title: newItemTitle });

      const res = await api.get(`/groups/${id}`);
      setGroup(res.data);

      setNewItemTitle("");
    } catch (error) {
      console.error("Item qo‘shishda xatolik:", error);
    }
  };
  if (!group) return <div className="p-4">Loading...</div>;

  return (
    <div className="main">
      <h1 className="main-title">{group.name}</h1>

      <div className="grid">
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">
              Items <span className="badge">{group.items?.length || 0}</span>
            </h2>
            <div>
              <input
                type="text"
                className="input-add"
                placeholder="Title"
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddItem();
                  }
                }}
              />
              <button className="add-button" onClick={handleAddItem}>
                +
              </button>
            </div>
          </div>
          <ul className="item-list">
            {(group.items || []).map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <div className="section-header">
            <h2 className="section-title">
              Members{" "}
              <span className="badge">{group.members?.length || 0}</span>
            </h2>
            <div className="text-sm">
              Owner: <strong>{group.owner?.username}</strong>
            </div>
          </div>
          <ul className="member-list">
            {(group.members || []).map((member) => (
              <li key={member.id} className="member-badge">
                <div className="member-icon">{member.username[0]}</div>
                <span>{member.username}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Group;
