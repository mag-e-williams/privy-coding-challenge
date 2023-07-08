import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { fetchMetObjects } from '@/api/fetchMetObjects';
import { fetchMetObjectsData } from '@/api/fetchMetObjectsData';

import type { MetObjectsData } from '@/types/MetObjectsData';
import type { MetObjects } from '@/types/MetObjects';

import Header from '@/components/Header';
import ObjectList from '@/components/ObjectList';
import Filters from '@/components/Filters';

import { Container, Pagination, Stack, Typography } from '@mui/material';
import { FilterCategory, checkboxFilters, filters } from '@/utils/filters';

const PAGE_SIZE = 40;

function groupBy(objectArray: any[], property: string) {
  return objectArray.reduce((acc, obj) => {
     const key = obj[property];
     if (!acc[key]) {
        acc[key] = [];
     }
     // Add object to list for given key's value
     acc[key].push(obj);
     return acc;
  }, {});
}

export default function Collection() {
  const router = useRouter();
  const [museumObjects, setMuseumObjects] = useState<MetObjects>();
  const [museumObjectsData, setMuseumObjectsData] = useState<MetObjectsData[]>([]);

  const [page, setPage] = useState<number>(Number(router.query.page) || 1);
  const [searchTerm, setSearchTerm] = useState<string>(router.query.search as string);
  const [selectedFilters, setSelectedFilters] = useState<FilterCategory[]>([]);
  const [totalPages, setTotalPages] = useState<number>();

  useEffect(() => {
    const fetchObjects = async () => {
      const response = await fetchMetObjects(searchTerm, selectedFilters);
      setMuseumObjects(response)
      setTotalPages(Math.ceil(response.total / PAGE_SIZE))
    }
    if (searchTerm) {
      fetchObjects()
    }
  }, [searchTerm, selectedFilters, setMuseumObjects, setTotalPages]);

  useEffect(() => {
    const fetchObjectsData = async () => {
      if (museumObjects) {
        const response = await fetchMetObjectsData(museumObjects.objectIDs, page, PAGE_SIZE);
        setMuseumObjectsData(response)
      }
    }

    fetchObjectsData()
  }, [museumObjects, page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, selectedPage: number) => {
    event.stopPropagation;
    setPage(selectedPage);
    updateURL(selectedPage, searchTerm);
  };

  const handleSearch = (e: string) => {    
    setPage(1);
    setSearchTerm(e)
    updateURL(1, e);
  };

  const handleFilter = (e: FilterCategory[]) => {
    setPage(1);
    setSelectedFilters(e)
    updateURL(1, searchTerm, e);
  };

  const updateURL = (selectedPage: number, term?: string, filterParams?: FilterCategory[] ) => {
    let queryParams = new URLSearchParams();
    if (selectedPage) {
      queryParams.append('page',  selectedPage.toString())
    }
    if (term) {
      queryParams.append('search', term)
    }

    if (filterParams) {
      const checkboxFilterUrlIds = checkboxFilters.filter(e=>e.category == 'checkboxes').map(e=>e.urlId)
      const checkboxFilterParams = filterParams.filter(e => checkboxFilterUrlIds.includes(e.urlId))
      checkboxFilterParams?.forEach(e => (
        queryParams.append(e.urlId, 'true')
      ))

      const dropdownFilterUrlIds = checkboxFilters.filter(e=>e.category == 'dropdown').map(e=>e.urlId)
      const dropdownFilterParams = filterParams.filter(e => dropdownFilterUrlIds.includes(e.urlId))
      
      const orderedIds: string[] = []
      dropdownFilterParams.forEach(e => {
        if (!orderedIds.includes(e.urlId)) {
          orderedIds.push(e.urlId)
        }
      })
      const groupedParams = groupBy(dropdownFilterParams, 'urlId')
      console.log(groupedParams)
      orderedIds.forEach(e => {
        queryParams.append(e, groupedParams[e].map((e: FilterCategory)=>e.title))
      })
    }

    router.push(`/collection?${queryParams.toString()}`);
    
  };

  useEffect(() => {
    const { page: urlPage, search: urlSearch } = router.query;
    setPage(Number(urlPage) || 1);
    setSearchTerm(urlSearch as string || '');
  }, [router.query]);
  
  return (
    <>
      <Header />
      
      <Container sx={{ marginTop: 14}}>
        <Stack direction="row" sx={{alignItems: 'baseline'}} justifyContent="space-between">
          <Typography variant="h2" sx={{ marginBottom: 4}}>
            Search The Collection
          </Typography>

          <Typography variant="h6" sx={{ marginBottom: 4}}>
            {museumObjects?.total.toLocaleString()} results {searchTerm && searchTerm != '' ? `for ${searchTerm}` : ''}
          </Typography>
        </Stack>

        <Filters searchTerm={searchTerm || ''} setSearchTerm={handleSearch} selectedFilters={selectedFilters} setSelectedFilters={handleFilter}/>
        <ObjectList objects={museumObjectsData}/> 
        
        <Container 
          sx={{ 
            marginY: 6,
            display: 'flex',
            justifyContent: 'center',
          }}>

          <Pagination 
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            size="small" 
            showFirstButton 
            showLastButton 
          />

        </Container>

      </Container>
    
    </>
  );
}

