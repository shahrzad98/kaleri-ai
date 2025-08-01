import apiClient from '@/lib/api-client';
import {RandomUserResponse} from "@/models";

export const getRandomUser = () => apiClient.get<RandomUserResponse>('/?results=1&nat=us')
