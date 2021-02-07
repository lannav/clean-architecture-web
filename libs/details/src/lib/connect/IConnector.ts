import React from 'react';

export interface IConnector<TUseCases> {
    Provider: React.FC<{ useCases: TUseCases }>;
    connect<TProps extends Partial<TUseCases>>(
        Component: React.ComponentType<TProps>,
        ...useCases: Extract<keyof TProps, keyof TUseCases>[]
    ): React.ComponentType<Omit<TProps, keyof TUseCases>>;
}
