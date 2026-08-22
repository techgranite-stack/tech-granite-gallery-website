import type { StoneProduct } from '@/types/stone';
import Reveal from '@/components/ui/Reveal';
import styles from './ProductSpecs.module.css';

interface ProductSpecsProps {
  product: StoneProduct;
}

export default function ProductSpecs({ product }: ProductSpecsProps) {
  const specRows = [
    { label: 'Material Type',     value: product.category === 'granite' ? 'Granite' : product.category === 'imported-marble' ? 'Imported Marble' : 'Indian Marble' },
    { label: 'Origin',            value: product.origin },
    product.specs.hardness          && { label: 'Mohs Hardness',       value: product.specs.hardness },
    product.specs.density           && { label: 'Density',             value: product.specs.density },
    product.specs.waterAbsorption   && { label: 'Water Absorption',    value: product.specs.waterAbsorption },
    product.specs.compressiveStrength && { label: 'Compressive Strength', value: product.specs.compressiveStrength },
    product.specs.porosity          && { label: 'Porosity',            value: product.specs.porosity },
    product.specs.abrasionResistance && { label: 'Abrasion Resistance', value: product.specs.abrasionResistance },
    product.specs.thickness         && { label: 'Standard Thickness',  value: product.specs.thickness },
    { label: 'Available Finishes', value: product.finishes.map(f => f.label).join(', ') },
    { label: 'Standard Sizes',    value: product.sizes.map(s => s.label).join('  ·  ') },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Left — description + highlights */}
        <div className={styles.left}>
          <Reveal animation="fade-right">
            <span className={styles.eyebrow}>About This Stone</span>
            <h2 className={styles.heading}>
              {product.name}
              {product.altNames?.length ? <em> / {product.altNames[0]}</em> : null}
            </h2>
            <p className={styles.description}>{product.description}</p>

            <ul className={styles.highlights}>
              {product.highlights.map((h, i) => (
                <li key={i} className={styles.highlightItem}>
                  <span className={styles.bullet}>✦</span>
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Right — specs table */}
        <div className={styles.right}>
          <Reveal animation="fade-left">
            <div className={styles.specsCard}>
              <h3 className={styles.specsTitle}>Technical Specifications</h3>
              <table className={styles.table}>
                <tbody>
                  {specRows.map((row) => (
                    <tr key={row.label} className={styles.row}>
                      <td className={styles.rowLabel}>{row.label}</td>
                      <td className={styles.rowValue}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
