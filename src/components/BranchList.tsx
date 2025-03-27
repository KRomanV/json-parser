import React from 'react';

interface BranchListProps {
    branches: string[];
    onSelectBranch: (branch: string) => void;
}

const BranchList: React.FC<BranchListProps> = ({ branches, onSelectBranch }) => {
    return (
        <div className="branch-list">
            {branches.map((branch) => (
                <div
                    key={branch}
                    className="branch-item"
                    onClick={() => onSelectBranch(branch)}
                >
                    {branch}
                </div>
            ))}
        </div>
    );
};

export default BranchList;
