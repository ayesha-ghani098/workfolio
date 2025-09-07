import siteData from '../../content/site-data.json';
import type { SiteData } from '@/types/site-data';

export const getSiteData = (): SiteData => {
  return siteData as SiteData;
};

export const getHero = () => getSiteData().hero;
export const getMajorProjects = () => getSiteData().majorProjects;
export const getSideMissions = () => getSiteData().sideMissions;
export const getJourney = () => getSiteData().journey;
export const getSkills = () => getSiteData().skills;
export const getContact = () => getSiteData().contact;
export const getConfig = () => getSiteData().config; 