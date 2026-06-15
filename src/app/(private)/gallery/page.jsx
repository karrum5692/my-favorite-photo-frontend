'use client';

import React, { useState, useEffect, useRef } from 'react';
import FilterBar from '../../../features/marketplace/components/FilterBar';
import '../../../styles/market.css';
import Button from '@/components/ui/Button';
import PhotoCardGrid from '../../../features/marketplace/components/PhotoCardGrid';

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('latest');
  const [activeFilter, setActiveFilter] = useState({ type: '', value: '' });

  return (
    <div className="marketplace-container">
      <main className="marketplace-content">
        <section className="marketplace-header-section">
          <h1 className="marketplace-title hover:opacity-80 ">마이 갤러리</h1>

          <div className="marketplace-sell-btn pc-only-btn">
            <Button variant="primary" height="60">
              포토카드 생성하기
            </Button>
          </div>
        </section>

        <section className="marketplace-controls">
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            search={search}
            onSearchChange={setSearch}
            orderBy={orderBy}
            onOrderByChange={setOrderBy}
          />
        </section>

        <section className="photocard-grid-layout mt-6"></section>
      </main>
    </div>
  );
}
