'use client';
import React, { useState } from 'react';
import './AddGroup.css'; // Importing CSS file for styling

const AddGroup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    bio: '',
    adresse: '',
    group_type: '',
    department: '',
    function: '',
    project: '',
    auto_assign: false,
    role_id: '',
    photo: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'photo' && e.target.files) {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const formDataToSend = new FormData();

    // Append only non-null values
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key as keyof typeof formData];
        if (value !== null) {
          formDataToSend.append(key, value as string | Blob);
        }
      }
    }

    try {
      const response = await fetch('https://www.backend.lnb-intranet.globalitnet.org/utilisateurs_groupes/create-group/', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      if (data?.success) {
        setMessage('Groupe ajouté avec succès!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: '',
          bio: '',
          adresse: '',
          group_type: '',
          department: '',
          function: '',
          project: '',
          auto_assign: false,
          role_id: '',
          photo: null, // Reset photo to null
        });
      } else {
        setError(data?.message || 'Erreur inconnue');
      }
    } catch (err) {
      setError('Erreur lors de l\'ajout du groupe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-group-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Ajouter un Groupe</h2>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Bio:</label>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Group Type:</label>
          <input
            type="text"
            name="group_type"
            value={formData.group_type}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Function:</label>
          <input
            type="text"
            name="function"
            value={formData.function}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Project:</label>
          <input
            type="text"
            name="project"
            value={formData.project}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Auto Assign:</label>
          <input
            type="checkbox"
            name="auto_assign"
            checked={formData.auto_assign}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Role ID:</label>
          <input
            type="text"
            name="role_id"
            value={formData.role_id}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Photo:</label>
          <input
            type="file"
            name="photo"
            onChange={handleInputChange}
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddGroup;
