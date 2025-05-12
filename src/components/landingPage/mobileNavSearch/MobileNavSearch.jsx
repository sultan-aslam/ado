'use client';

import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { IoIosSearch } from 'react-icons/io';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styles from './mobileNavSearch.module.css';
import TrustPilotMobile from '../../../../public/images/TrustPilotMobile.svg';
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
import { fetchNavSearchList } from '@/store/features/navSearch/navSearchSlice';
import { fetchFiltersDestination } from '@/store/features/getFilters/getFiltersSlice';
import SearchModal from '@/components/searchModal/SearchModal';

const MobileNavSearch = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (data?.length === 0) {
      dispatch(
        fetchNavSearchList({ PageNumber: 1, PageSize: 10, searchTerm: '' })
      );
    }
  }, [dispatch]);

  const { data, loading, error } = useAppSelector(state => state.searchList);

  useEffect(() => {
    if (searchInput) {
      const results = data.filter(item =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [searchInput, data]);

  const handleLinkClick = result => {
    try {
      if (result.category === 'hotel') {
        router.push(`/hotel/${result.code}`);
        setOpen(false);
      } else {
        let payload = {};
        let paramKey = '';

        switch (result.category) {
          case 'country':
            payload = { id: result.id, destination: 'countries' };
            paramKey = payload?.destination;
            break;
          case 'landingpage':
            payload = { id: result.id, destination: 'landingpages' };
            paramKey = payload?.destination;
            break;
          case 'region':
            payload = { id: result.id, destination: 'regions' };
            paramKey = payload?.destination;
            break;
          case 'place':
          default:
            payload = { id: result.id, destination: 'places' };
            paramKey = payload?.destination;
            break;
        }

        dispatch(fetchFiltersDestination(payload));
        if (!loading && !error) {
          router.push(`/destination/?Destination=${paramKey}&id=${result.id}`);
          setOpen(false);
        }
      }
    } catch (error) {
      console.error('Error navigating:', error);
    }
  };

  return (
    <div>
      <div className=''>
        <div className={styles.searchContainer} onClick={() => {
          setOpenSearchModal(true);
        }} >
          <Input
            size='large'
            placeholder='Zoek uw hotel of bestemming'
            prefix={<IoIosSearch />}
            style={{ height: '40px' }}
            onClick={() => {
              setOpenSearchModal(true);
            }}
          // value={searchInput}
          // onChange={e => setSearchInput(e.target.value)}
          />

          {/* {searchInput && filteredResults?.length > 0 && (
            <div className={styles.searchResults}>
              {filteredResults?.map((result) => (
                <div
                  key={result.id}
                  style={{
                    borderBottom: '1px solid gray',
                    display: 'flex',
                    padding: '10px 0px',
                    cursor: 'pointer',
                    gap: '50px',
                    width: '100%',
                    justifyContent: 'space-between'
                  }}
                  className={styles.nameCategory}
                  onClick={() => handleLinkClick(result)}
                >
                  <div className={styles.name}>{result.name}</div>
                  <div className={styles.role}>({result.category})</div>
                </div>
              ))}
            </div>
          )} */}
        </div>
        {openSearchModal && (
          <SearchModal open={openSearchModal} setOpen={setOpenSearchModal} />
        )}
        {!openSearchModal && (
          <>
            <div className={styles.satisfiedCustomer}>
              <h2 className={styles.titleCustomer}>Tevreden klanten</h2>
              <a href="https://nl.trustpilot.com/review/www.adotravel.nl" target='_blank'>
                <Image src={TrustPilotMobile} alt='heelo' />
              </a>
            </div>

          </>
        )}
      </div>
      {!openSearchModal && <div className={styles.border}></div>}
    </div>
  );
};

export default MobileNavSearch;
