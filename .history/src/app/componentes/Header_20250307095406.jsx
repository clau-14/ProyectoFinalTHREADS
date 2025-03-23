"use client"
import { useEffect } from 'react';
import useUserStore from '@/store/userstore';
import { useRouter } from 'next/navigation';





const Header = ({ handleOpenModal }) => {
  const { user } = useUserStore();

