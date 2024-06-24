'use client'

import { VStack, Text} from '@chakra-ui/react';
import React, { useEffect } from 'react';

export default function Verified() {
        useEffect(() => {
            const timer = setTimeout(() => {
                window.location.href = '/';
            }, 3000);
            return () => clearTimeout(timer);
        }, []);
    

    return (
    <>
    <VStack mt={100} mb={200}>
        <Text>
            You have been verified.
        </Text>
        <Text>
            Please log in via login Tab on top right of the page.
        </Text> 
    </VStack>
    </>
    ) 
}