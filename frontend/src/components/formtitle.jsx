import React from 'react';

export default function FormTitle({ title,subtitle,link,linkText}) {
    return (
        <>
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            {subtitle}{' '}
            <a
              href={link}
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              {linkText}
            </a>
          </p>
        </>
    )
}