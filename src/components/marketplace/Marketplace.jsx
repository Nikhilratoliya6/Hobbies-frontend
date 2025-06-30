import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Marketplace.module.css';

const Marketplace = () => {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with API call to your backend
  const mockServices = [
    {
      id: 1,
      title: "Professional Portrait Photography",
      artist: "Sarah Johnson",
      category: "photography",
      price: "$150/session",
      image: "https://images.unsplash.com/photo-1554048612-b6a482b76049?w=400",
      rating: 4.9,
      location: "New York, NY",
      description: "Capture your personality with professional portrait sessions"
    },
    {
      id: 2,
      title: "Live Acoustic Performance",
      artist: "Mike Torres",
      category: "music",
      price: "$300/hour",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      rating: 4.8,
      location: "Los Angeles, CA",
      description: "Solo acoustic guitar and vocals for intimate events"
    },
    {
      id: 3,
      title: "Custom Digital Illustration",
      artist: "Emma Chen",
      category: "visual-arts",
      price: "$200/piece",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
      rating: 5.0,
      location: "San Francisco, CA",
      description: "Digital artwork and illustrations for personal or commercial use"
    },
    {
      id: 4,
      title: "Wedding DJ Services",
      artist: "DJ Alex Rivera",
      category: "entertainment",
      price: "$800/event",
      image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400",
      rating: 4.7,
      location: "Chicago, IL",
      description: "Complete wedding DJ package with lighting and sound"
    },
    {
      id: 5,
      title: "Contemporary Dance Performance",
      artist: "Luna Dancers",
      category: "dance",
      price: "$500/performance",
      image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400",
      rating: 4.9,
      location: "Miami, FL",
      description: "Professional contemporary dance troupe for events"
    },
    {
      id: 6,
      title: "Face Painting & Balloon Art",
      artist: "Rainbow Creations",
      category: "entertainment",
      price: "$120/hour",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
      rating: 4.8,
      location: "Austin, TX",
      description: "Fun entertainment for children's parties and events"
    }
  ];

  useEffect(() => {
    setServices(mockServices);
  }, []);

  const categories = [
    { id: 'all', name: 'All Services', icon: '🎨' },
    { id: 'visual-arts', name: 'Visual Arts', icon: '🎨' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'photography', name: 'Photography', icon: '📸' },
    { id: 'dance', name: 'Dance', icon: '💃' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎪' }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = filter === 'all' || service.category === filter;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.artist.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.marketplace}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Arts & Entertainment Marketplace</h1>
          <p>Discover talented artists and creative professionals in your area</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.filters}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search for services or artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.categories}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`${styles.categoryBtn} ${filter === category.id ? styles.active : ''}`}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.servicesGrid}>
          {filteredServices.map(service => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.imageContainer}>
                <img src={service.image} alt={service.title} />
                <div className={styles.rating}>
                  ⭐ {service.rating}
                </div>
              </div>
              
              <div className={styles.cardContent}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.artistName}>by {service.artist}</p>
                <p className={styles.description}>{service.description}</p>
                
                <div className={styles.serviceInfo}>
                  <span className={styles.location}>📍 {service.location}</span>
                  <span className={styles.price}>{service.price}</span>
                </div>
                
                <div className={styles.cardActions}>
                  <Link to={`/service/${service.id}`} className={styles.viewBtn}>
                    View Details
                  </Link>
                  <button className={styles.contactBtn}>
                    Contact Artist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className={styles.noResults}>
            <h3>No services found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
