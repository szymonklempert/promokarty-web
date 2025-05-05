"use client";
import { Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange}: PaginationProps
) => (
    <Flex align='center' gap={4}>
        <ButtonGroup>
            <Button
            onClick={() => onPageChange(currentPage - 1)}
            isDisabled={currentPage <= 1}>
                Previous
            </Button>
            <Text>
                Page {currentPage} of {totalPages}
            </Text>
            <Button
            onClick={() => onPageChange(currentPage +1)}
            isDisabled={currentPage >= totalPages}>
                Next
            </Button>
        </ButtonGroup>
    </Flex>
)